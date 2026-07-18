export function tokenizeSearchText(text: string): string[] {
  return Array.from(
    new Intl.Segmenter("zh-CN", { granularity: "word" }).segment(text)
  ).filter((part) => part.isWordLike).map((part) => part.segment);
}

export function normalizeSearchTerm(term: string): string {
  return term.toLocaleLowerCase("zh-CN");
}
