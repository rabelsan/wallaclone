export const getLoggedUserToken = state => { return state.auth ? state.auth.token: null; }

export const getLoggedUserId = state => { return state.auth ? state.auth.id: null; }

export const getUi = state => state.ui;

export const getAds = state => state.ads;

export const getAdDetails = state => state.adDetails; 

export const getAdvertById = id => state => {
  let result = getAds(state);
  if (!result) {
    return null;
  }
  return result.adverts.find(ad => ad._id === id); 
};

export const getTags = state => state.tags;
