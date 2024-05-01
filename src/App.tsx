import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./api/store";
import { storySelect } from "./api/storiesSelect";
import storiesSlice from "./api/storiesSlice";
import { getStories } from "./api/api";

function App() {
  const dispatch = useAppDispatch();
  const stories = useAppSelector(storySelect);

  useEffect(() => {
    dispatch(getStories());
  }, []);

  return (
    <div className="App">
      {stories?.story.map((story) => {
        return (
          <p key={story.id}>
            {story.title}
            {story.by}
          </p>
        );
      })}
    </div>
  );
}

export default App;
