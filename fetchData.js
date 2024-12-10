


export async function fetchData() {
    const url = "https://perenual.com/api/species-list?key=sk-Reob67573481e99577812&page=3";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }