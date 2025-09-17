// GitHub Gist URL containing the loops data
const GIST_URL = 'https://gist.githubusercontent.com/trillbill/d9e8a3c4ff5502053f11e6507970c64c/raw';

// Cache for the fetched data
let cachedLoopPacks = null;
let fetchPromise = null;

// Function to fetch loops data from GitHub Gist
const fetchLoopPacks = async () => {
  if (cachedLoopPacks) {
    return cachedLoopPacks;
  }

  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    try {
      const response = await fetch(GIST_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      
      const data = await response.json();
      cachedLoopPacks = data;
      return data;
    } catch (error) {
      console.error('Error fetching loops data:', error);
      // Return empty array as fallback
      return [];
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
};

// Helper function to get all loops from all packs
export const getAllLoops = async () => {
  const loopPacks = await fetchLoopPacks();
  return loopPacks.map(pack => pack.loops).flat();
};

// Helper function to get unique pack numbers
export const getPackNumbers = async () => {
  const loopPacks = await fetchLoopPacks();
  return [...new Set(loopPacks.map(pack => pack.pack_number))];
};

// Export the fetch function for direct access if needed
export { fetchLoopPacks };
