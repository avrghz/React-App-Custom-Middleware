import { apiRequest } from '../actions/api';
import {
    QUERY_SEASONS
} from '../constants/api';
import {
    FETCH_SEASONS, FETCH_SEASONS_SUCCESS,
    FETCH_SEASONS_ERROR, FETCH_SEASONS_FROM_SESSION,
    UPDATE_SEASON_RANGE_FROM, UPDATE_SEASON_RANGE_TO
} from '../constants/actionTypes';
import { KEY_SEASONS_LIST } from '../constants/sessionKeys';
import { setSessionStorage, getSessionStorage } from '../util';

import { updateSeasons, updateSeasonRange } from '../actions/seasons';

export const fetchSeasonsSuccess = ({ dispatch }) => next => action => {
    next(action);
    if (action.type === FETCH_SEASONS_SUCCESS) {
        let payload = [];
        if (action.payload.data.MRData.SeasonTable && action.payload.data.MRData.SeasonTable.Seasons) {
            payload = action.payload.data.MRData.SeasonTable.Seasons;
            setSessionStorage(KEY_SEASONS_LIST, payload);
        }
        dispatch(updateSeasons(payload));
    }
};

export const fetchSeasonsFlow = ({ dispatch, getState }) => next => action => {
    next(action);
    if (action.type === FETCH_SEASONS) {
        const seasons = getState().seasons.list;
        const payload = getSessionStorage(KEY_SEASONS_LIST);
        if (payload && payload.length > 0) {
            dispatch({ type: FETCH_SEASONS_FROM_SESSION });
            dispatch(updateSeasons(payload));
        } else {
            dispatch(apiRequest('GET', QUERY_SEASONS, null, FETCH_SEASONS_SUCCESS, FETCH_SEASONS_ERROR));
        }
    }
};

export const updateSelectedSeason = ({ dispatch, getState }) => next => action => {
    next(action);
    //Change selected "To year" to 1 year more than "From year"
    if (action.type === UPDATE_SEASON_RANGE_FROM) {
        if (getState().seasons.toYear <= action.payload) {
            let payload = `${parseInt(action.payload, 10) + 1}`;
            dispatch(updateSeasonRange(UPDATE_SEASON_RANGE_TO, payload));
        }
    }
}

export const seasons = [fetchSeasonsFlow, fetchSeasonsSuccess, updateSelectedSeason];