
import SimpleMDEReact from 'react-simplemde-editor'

// styles
import "easymde/dist/easymde.min.css";

const SimpleEditor = () => {
  const delay = 1000;
  const options = {
    autofocus: true,
    autosave: {
      enabled: true,
      uniqueId: "1",
      delay,
    },
  };
  return (
    <SimpleMDEReact id="1" options={options} />
  )
}

export default SimpleEditor