import { useGetBackgroundJson } from '@/_hooks/query/json/useGetBackgroundJson';

export function useGetBackgroundData() {
  const {
    json,
    loading,
    done,
  } = useGetBackgroundJson();

  const purposeReal = json.목적현실;
  const purposeFantasy = json.목적가상;
  const originReal = [ ...json.출신지기본, ...json.출신지현실, ];

  const originFantasyPrefix = json.출신지가상_수식;
  const originFantasyPlace = json.출신지가상_장소;

  function getOriginFantasy() {
    const originFantasy = [];

    originFantasyPrefix.forEach((prefix) => {
      originFantasyPlace.forEach((place) => {
        originFantasy.push(`${prefix} ${place}`);
      });
    });

    return originFantasy;
  }
  const originFantasy = [ ...getOriginFantasy(), ...json.출신지기본, ];

  return {
    purposeReal,
    purposeFantasy,
    originReal,
    originFantasy,
  };
}
