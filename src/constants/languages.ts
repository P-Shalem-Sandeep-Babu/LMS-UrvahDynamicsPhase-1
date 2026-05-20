export const LANGUAGES = [
  { id: "python", name: "Python", extension: ".py" },
  { id: "c", name: "C", extension: ".c" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "java", name: "Java", extension: ".java" }
];

export const getLanguageLabel = (id: string) => {
  return LANGUAGES.find(l => l.id === id)?.name || id;
};
