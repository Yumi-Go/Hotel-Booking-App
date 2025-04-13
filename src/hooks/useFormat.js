export function capitalize(string) {
    if (string) {
        const firstLetter = string[0].toUpperCase();
        const rest = string.slice(1).toLowerCase();
        return firstLetter + rest;
    } else {
        return string;
    }
}

export function capitalizeWords(paragraph) {
    if (!paragraph) return '';
    return paragraph
        .split(' ')
        .map(word => {
            if (word) {
                const firstLetter = word[0].toUpperCase();
                const rest = word.slice(1).toLowerCase();
                return firstLetter + rest;
            } else {
                return word;
            }
        })
        .join(' ');
}

export function formatDescription(text) {
    if (!text) return [];
    const result = text.split(/,\s*|\n/);
    // return result.filter((string) => !string.includes('sqm') || !string.includes("sqft"));
    return result;
}

export function extractSquareMeters(text) {
    if (!text) return [];
    const pattern = /\b(\d+)sqm/g;
    let results = [];
    let match;
    
    while ((match = pattern.exec(text)) !== null) {
      results.push(parseInt(match[1], 10));
    }
    
    return results;
  }



export function formatFullName(fName, mName, lName) {
    return `${capitalize(fName)} ${capitalize(mName)} ${capitalize(lName)}`;
}