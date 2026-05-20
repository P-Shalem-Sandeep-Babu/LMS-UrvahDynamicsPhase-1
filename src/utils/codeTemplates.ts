export const CODE_TEMPLATES: Record<string, string> = {
  python: `def solve():\n    # Write your code here\n    pass\n\nif __name__ == '__main__':\n    solve()`,
  c: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`
};

export const getTemplate = (languageId: string): string => {
  return CODE_TEMPLATES[languageId] || "";
};
