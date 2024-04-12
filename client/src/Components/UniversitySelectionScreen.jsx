import { useUniversities } from "../contexts/AppContext";
import NavigateArrow from "./NavigateArrow";
import Spinner from "./Spinner";
import UniversitiesContainer from "./UniversitiesContainer";
import University from "./University";
export default function UniversitySelectionScreen() {

  return (
    <>
      <NavigateArrow type='up'/>
      <UniversitiesContainer />
      <NavigateArrow type='down'/>
      
    </>
  );
}
