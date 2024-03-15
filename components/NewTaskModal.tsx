import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import capitalize from '@/lib/capitalize';

interface Props {
    visible: boolean;
    onClose: () => void;
    name: string;
  }

  const NewTaskModal: React.FC<Props> = ({ visible, onClose, name }) => {


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
            <div className='task-modal-w1'>
             <h1 className='modal-collection-name'>
             {capitalize(name)}
            </h1>
                <span>Add a task to your collection</span><br />
                <span>You can add as many tasks as you want</span>
            </div>
            <form className='modal-form'>

            <div className='task-modal-w2'>
                <h3>Content </h3>
                <label >
                    <textarea 
                    className="resize-none w-full" 
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
          <button 
          className='authbtn task-create'
          type="submit"  
          onClick={submit}>
           Submit
           </button>
          </form>
      </Modal>
    </>
  );
};

export default NewTaskModal;


