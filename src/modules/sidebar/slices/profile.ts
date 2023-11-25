import { profileService } from "@/modules/sidebar/services";
import { loadingState } from "@/shared/constants/loadingState";
import { RootState } from "@/shared/infra/redux/store";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProfileState {
  loadingState: loadingState;
  profile: any;
}

const initialState: ProfileState = {
  loadingState: "IDLE",
  profile: {},
};

export const getProfileAction = createAsyncThunk(
  "profile/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      console.log(response);
      if (response.isRight()) {
        return response.value.getValue();
      }
      return rejectWithValue(response.value);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      console.log("37", action);
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.loadingState = "COMPLETE";
        profileSlice.caseReducers.setProfile(state, action);
      })
      .addCase(getProfileAction.pending, (state, _action) => {
        state.loadingState = "LOADING";
      })
      .addCase(getProfileAction.rejected, (state, _action) => {
        state.loadingState = "ERROR";
      });
  },
});

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
