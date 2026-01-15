
import { GenderOption } from '../types';

export const getGenderTerms = (gender: GenderOption) => {
  switch (gender) {
    case 'male':
      return {
        son_daughter: 'son',
        he_she: 'he',
        him_her: 'him',
        his_her: 'his',
        my_child: 'my child'
      };
    case 'female':
      return {
        son_daughter: 'daughter',
        he_she: 'she',
        him_her: 'her',
        his_her: 'hers',
        my_child: 'my child'
      };
    default:
      return {
        son_daughter: 'beloved',
        he_she: 'they',
        him_her: 'them',
        his_her: 'their',
        my_child: 'my child'
      };
  }
};

export const personalizeText = (text: string, name: string, gender: GenderOption): string => {
  const terms = getGenderTerms(gender);
  const displayName = name.trim() || '[Your Name]';
  
  return text
    .replace(/{{NAME}}/g, displayName)
    .replace(/{{SON_DAUGHTER}}/g, terms.son_daughter)
    .replace(/{{MY_CHILD}}/g, terms.my_child)
    .replace(/{{HE_SHE}}/g, terms.he_she)
    .replace(/{{HIM_HER}}/g, terms.him_her)
    .replace(/{{HIS_HER}}/g, terms.his_her);
};
