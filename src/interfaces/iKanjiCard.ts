export default interface IKanjiCard {
  title: string;
  background: (
    | {
        image: string;
      }
    | {
        color: string;
      }
  )[];
  kanji: { kanji: string; color: string };
  image: string;
  imageAlt?: string;
  kunyomis: string[];
  onyomis: string[];
  vocabulary: {
    french: string;
    japanese: { kanji: string; furigana?: string }[];
  }[];
}
