import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const getStoriesSlice = (state: RootState) => state;

export const storySelect = createSelector(getStoriesSlice, (stories) => {
  return stories.stories;
});
