async function getOutfits() {
    try {
      const response = await fetch('http://localhost:3000/outfit');
      const outfits = await response.json();
      return outfits;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  