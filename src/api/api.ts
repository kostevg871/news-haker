import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://hacker-news.firebaseio.com/v0";

type StoriesNumbers = number[];

export interface IStory {
  by?: string;
  descendants?: number;
  id?: number;
  kids?: number[];
  score?: number;
  time?: Date | undefined;
  title?: string;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  url?: string;
}

export const getStories = createAsyncThunk(
  "stories/getStories",
  async (_, thunkAPI) => {
    try {
      const stories = await axios<StoriesNumbers>(
        `${BASE_URL}/newstories.json`
      );

      const storyInfo = await Promise.all(
        stories.data.slice(0, 2).map(async (storiesNumber) => {
          const storyInfo = (
            await axios<IStory>(`${BASE_URL}/item/${storiesNumber}.json`)
          ).data;
          return storyInfo;
        })
      );
      const storiesWithDescription = stories.data.map((story) => {
        const storiesInfo = storyInfo.find(({ id }) => story === id);
        return { ...storiesInfo };
      });
      return storiesWithDescription;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
