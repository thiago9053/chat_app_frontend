import { contactService } from "@/modules/sidebar/services";
import { loadingState } from "@/shared/constants/loadingState";
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { RootState } from "@/shared/infra/redux/store";
import {
  getApplicationsResponse,
  handleApplicationArgs,
} from "@/modules/sidebar/services/contact.service";

export interface ApplicationState {
  avatarUrl: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  loadingState?: loadingState;
  requestId: string;
}

interface ApplicationsState {
  loadingState: loadingState;
  applications: ApplicationState[];
}

const initialState: ApplicationsState = {
  loadingState: "IDLE",
  applications: [],
};

export const getAllApplicationsAction = createAsyncThunk(
  "applications/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await contactService.getApplications();
      if (response.isRight()) {
        return response.value.getValue();
      }
      return rejectWithValue(response.value);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const handleApplicationAction = createAsyncThunk(
  "applications/reject",
  async (args: handleApplicationArgs, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        applicationsSlice.actions.setApplicationLoadingState({
          ...args,
          loadingState: "LOADING",
        })
      );
      const response = await contactService.handleApplication(args);
      if (response.isRight()) {
        return { requestId: args.requestId };
      }
      return rejectWithValue(response.value);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setApplications: (
      state,
      action: PayloadAction<getApplicationsResponse>
    ) => {
      state.applications = action.payload.requestItems.map((item) => ({
        ...item,
        loadingState: "IDLE",
      }));
    },
    setApplicationLoadingState: (state, action) => {
      const { requestId, loadingState } = action.payload;
      const applicationIndex = current(state.applications).findIndex(
        (application) => {
          return application.requestId === requestId;
        }
      );
      if (applicationIndex >= 0) {
        if (loadingState)
          state.applications[applicationIndex].loadingState = loadingState;
      }
    },
    deleteApplication: (state, action) => {
      const { requestId } = action.payload;
      const applicationIndex = current(state.applications).findIndex(
        (application) => {
          return application.requestId === requestId;
        }
      );
      if (applicationIndex >= 0) {
        state.applications.splice(applicationIndex, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllApplicationsAction.fulfilled, (state, action) => {
        state.loadingState = "COMPLETE";
        applicationsSlice.caseReducers.setApplications(state, action);
      })
      .addCase(getAllApplicationsAction.pending, (state, action) => {
        state.loadingState = "LOADING";
      })
      .addCase(getAllApplicationsAction.rejected, (state, action) => {
        state.loadingState = "ERROR";
      });

    builder.addCase(
      handleApplicationAction.fulfilled,
      (state: ApplicationsState, action) => {
        const { requestId } = action.payload;
        applicationsSlice.caseReducers.setApplicationLoadingState(state, {
          ...action,
          payload: {
            ...action.payload,
            requestId,
            loadingState: "COMPLETE",
          },
        });
        applicationsSlice.caseReducers.deleteApplication(state, {
          ...action,
          payload: {
            ...action.payload,
            requestId,
          },
        });
      }
    );
  },
});

export const selectApplications = (state: RootState) => state.applications;

export default applicationsSlice.reducer;
