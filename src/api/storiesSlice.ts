import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IStory, getStories } from "./api";

export interface IStateStory {
  story: IStory[];
  isLoading: boolean;
  error: null;
}

const initialState: IStateStory = {
  story: [],
  isLoading: true,
  error: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    //incrementQuantity: (state, { payload }: PayloadAction<number>) => {
    //  const product = state.story.find((obj) => obj.id === payload);
    //  if (product && product.quantity >= 1 && product.quantity < 10) {
    //    product.quantity++;
    //  }
    //},
    //decrementQuantity: (state, { payload }: PayloadAction<number>) => {
    //  const product = state.story.find((obj) => obj.id === payload);
    //  if (product && product.quantity > 1) {
    //    product.quantity--;
    //  }
    //},
    //deleteCart: (state, { payload }: PayloadAction<number>) => {
    //  state.products = state.products.filter((obj) => obj.id !== payload);
    //},
  },
  extraReducers: (builder) => {
    builder.addCase(getStories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getStories.fulfilled,
      (state, { payload }: PayloadAction<IStory[]>) => {
        state.story = payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(getStories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default storySlice.reducer;
