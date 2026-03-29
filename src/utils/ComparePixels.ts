export function compareImages(userData: ImageData, refData: ImageData): number {
    let correct = 0;
    const total = userData.data.length / 4;
  
    const tolerance = 50;
  
    for (let i = 0; i < userData.data.length; i += 4) {
        const r1 = userData.data[i];
        const g1 = userData.data[i + 1];
        const b1 = userData.data[i + 2];
    
        const r2 = refData.data[i];
        const g2 = refData.data[i + 1];
        const b2 = refData.data[i + 2];
    
        const distance = Math.sqrt(
            (r1 - r2) ** 2 +
            (g1 - g2) ** 2 +
            (b1 - b2) ** 2
        );
    
        if (distance < tolerance) {
            correct++;
        }
    }
    
    return Math.round((correct / total) * 100);
  }