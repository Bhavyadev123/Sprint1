// src/components/ActionButton.js
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionButton = ({ type, onClick }) => {
  let buttonText;
  let IconComponent;

  switch (type) {
    case 'add':
      buttonText = 'Add Contact';
      IconComponent = <AddIcon />;
      break;
    case 'edit':
      buttonText = 'Update Contact';
      IconComponent = <EditIcon />;
      break;
    case 'delete':
      buttonText = 'Delete Contact';
      IconComponent = <DeleteIcon />;
      break;
    default:
      buttonText = 'Action';
      IconComponent = null;
  }

  return (
    <button onClick={onClick} className={`action-btn ${type}`}>
      {buttonText} {IconComponent}
    </button>
  );
};

export default ActionButton;
