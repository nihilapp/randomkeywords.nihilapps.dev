import characterKeyword from '@/json/캐릭터 관련.json';
import backgroundKeyword from '@/json/배경스토리 관련.json';
import otherKeyword from '@/json/기타.json';

function getOriginFantasy(originBasic: string[], originPrefix: string[], originPlace: string[]) {
  const originFantasy: string[] = [];
  originPrefix.forEach((prefix) => {
    originPlace.forEach((place) => {
      originFantasy.push(`${prefix} ${place}`);
    });
  });

  return [ ...originBasic, ...originFantasy, ];
}

export const getAllKeywords = () => {
  const {
    출신지기본, 출신지현실, 출신지가상_수식, 출신지가상_장소, 목적가상, 목적현실,
  } = backgroundKeyword;

  const characterKeywords = Object.values(characterKeyword);
  const otherKeywords = Object.values(otherKeyword);
  const originRealKeywords = [ ...출신지기본, ...출신지현실, ].map((item) => `출신지/${item}`);
  const originFantasyKeywords = getOriginFantasy(출신지기본, 출신지가상_수식, 출신지가상_장소).map((item) => `출신지/${item}`);
  const purposeKeywords = [ ...목적가상, ...목적현실, ].map((item) => `목적/${item}`);

  const keywordsLength = characterKeywords.length + otherKeywords.length + originRealKeywords.length + originFantasyKeywords.length + purposeKeywords.length;

  const allKeywordArrays = [
    ...characterKeywords,
    ...otherKeywords,
    ...purposeKeywords,
  ];

  const backgroundKeywrdArrays = [
    ...originRealKeywords,
    ...originFantasyKeywords,
  ];

  const combinedKeywords = allKeywordArrays.flat();
  const backgroundCombinedKeywords = backgroundKeywrdArrays.flat();
  return {
    length: keywordsLength,
    keywords: combinedKeywords,
    backgroundKeywords: backgroundCombinedKeywords,
  };
};
