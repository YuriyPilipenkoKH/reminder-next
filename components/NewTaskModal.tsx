import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface Props {
    visible: boolean;
    onClose: () => void;
  }

  const NewTaskModal: React.FC<Props> = ({ visible, onClose }) => {


  const submit = () => {
    
  }

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        className='task-modal'
        open={visible}
        title="Add task to collection "
        onOk={submit}
        onCancel={handleCancel}
        footer={[ ]}
      >
             <h1>
                NAME
            </h1>
            <div className='task-modal-w1'>
                <span>Add a task to your collection</span>
                <span>You can add as many tasks as you want</span>
            </div>
            <form >

            <div className='task-modal-w2'>
                <h3>Content </h3>
                <label >
                    <textarea 
                    className="resize-none" 
                    rows={5}
                    placeholder="Task conternt here">
                    </textarea>
                </label>

            </div>
            <div className='task-modal-w3'>
                <h3>expires at</h3>
                <label >
                    <input 
                    type="datetime-local" />
                </label>
            </div>
          <button type="submit"  onClick={submit}>
           Submit
           </button>
          </form>
      </Modal>
    </>
  );
};

export default NewTaskModal;


