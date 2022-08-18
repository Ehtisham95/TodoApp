import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TodoCheckbox = ({checked, onChecked}) => {
  const [isChecked, setChecked] = useState(checked);

  const handlePress = state => {
    setChecked(!isChecked);
    onChecked(state);
  };

  return (
    <BouncyCheckbox
      isChecked={isChecked}
      fillColor="green"
      onPress={() => handlePress(!isChecked)}
    />
  );
};

export default TodoCheckbox;
