import type { VercelRequest, VercelResponse } from '@vercel/node';
import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

type GenderOption = 'male' | 'female' | 'neutral';
type BibleVersion = 'web' | 'kjv';

interface SampleRequest {
  name: string;
  email: string;
  gender: GenderOption;
  bibleVersion: BibleVersion;
}

interface Verse {
  number: number;
  text: string;
}

interface ChapterData {
  version: string;
  versionName: string;
  book: string;
  chapter: number;
  title: string;
  subtitle: string;
  verses: Verse[];
}

function personalizeText(text: string, name: string, gender: GenderOption): string {
  const genderTerms: Record<GenderOption, { sonDaughter: string; myChild: string; heShe: string; himHer: string; hisHer: string }> = {
    male: { sonDaughter: 'son', myChild: 'my son', heShe: 'he', himHer: 'him', hisHer: 'his' },
    female: { sonDaughter: 'daughter', myChild: 'my daughter', heShe: 'she', himHer: 'her', hisHer: 'her' },
    neutral: { sonDaughter: 'beloved', myChild: 'my child', heShe: 'they', himHer: 'them', hisHer: 'their' }
  };

  const terms = genderTerms[gender];

  return text
    .replace(/\{\{NAME\}\}/g, name)
    .replace(/\{\{SON_DAUGHTER\}\}/g, terms.sonDaughter)
    .replace(/\{\{MY_CHILD\}\}/g, terms.myChild)
    .replace(/\{\{HE_SHE\}\}/g, terms.heShe)
    .replace(/\{\{HIM_HER\}\}/g, terms.himHer)
    .replace(/\{\{HIS_HER\}\}/g, terms.hisHer);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, gender, bibleVersion } = req.body as SampleRequest;

    if (!name || !email || !gender || !bibleVersion) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Load chapter data
    const dataPath = path.join(process.cwd(), 'data', `matthew-5-${bibleVersion}.json`);
    const chapterData: ChapterData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Create PDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 25;
    const contentWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Colors
    const navyColor = [26, 39, 68] as [number, number, number];
    const goldColor = [201, 162, 39] as [number, number, number];

    // Title page
    doc.setFillColor(26, 39, 68);
    doc.rect(0, 0, pageWidth, 60, 'F');

    doc.setTextColor(201, 162, 39);
    doc.setFontSize(12);
    doc.text('CALLED BY NAME', pageWidth / 2, 25, { align: 'center' });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text(chapterData.title, pageWidth / 2, 40, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`Personalized for ${name}`, pageWidth / 2, 52, { align: 'center' });

    yPosition = 80;

    // Subtitle
    doc.setTextColor(...navyColor);
    doc.setFontSize(16);
    doc.text(`${chapterData.book} Chapter ${chapterData.chapter}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(11);
    doc.text(chapterData.versionName, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Decorative line
    doc.setDrawColor(...goldColor);
    doc.setLineWidth(0.5);
    doc.line(margin + 40, yPosition, pageWidth - margin - 40, yPosition);
    yPosition += 15;

    // Verses
    doc.setTextColor(...navyColor);
    doc.setFontSize(11);

    for (const verse of chapterData.verses) {
      const personalizedText = personalizeText(verse.text, name, gender);
      const verseText = `${verse.number}. ${personalizedText}`;

      const lines = doc.splitTextToSize(verseText, contentWidth);
      const lineHeight = 6;
      const blockHeight = lines.length * lineHeight;

      // Check if we need a new page
      if (yPosition + blockHeight > pageHeight - margin - 20) {
        doc.addPage();
        yPosition = margin;

        // Page header
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(9);
        doc.text(`${chapterData.book} ${chapterData.chapter} — ${name}`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;
        doc.setTextColor(...navyColor);
        doc.setFontSize(11);
      }

      doc.text(lines, margin, yPosition);
      yPosition += blockHeight + 4;
    }

    // Footer on last page
    yPosition = pageHeight - margin;
    doc.setDrawColor(...goldColor);
    doc.line(margin + 40, yPosition - 15, pageWidth - margin - 40, yPosition - 15);

    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.text('CalledByName.com — Personalized Scripture', pageWidth / 2, yPosition - 5, { align: 'center' });
    doc.text('Public Domain Translation — Share Freely', pageWidth / 2, yPosition, { align: 'center' });

    // Generate PDF as base64
    const pdfBase64 = doc.output('datauristring').split(',')[1];

    return res.status(200).json({
      pdfBase64,
      filename: `Matthew-5-${name}-${bibleVersion.toUpperCase()}.pdf`
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
