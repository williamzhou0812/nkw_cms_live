import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {EditorState, convertToRaw, ContentState,convertFromHTML, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddCard = ({open, handleClose,  handleSaveNewCard}) => {

    const [editCard, setEditCard] = useState({
        card_title: '',
        card_editor_contents: ''
    });

    const [CardEditorState, setCardEditorState] = useState(
        EditorState.createEmpty()
    );

    // const handleSaveNewCard = () => { 
    //     console.log(`new Data by saved ` + data.card_editor_contents, data.card_title )
    //     axios.post('/api/cards', editCard).then(res => { 
    //         console.log(res.data)
    //     })
    // }

   

    return (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{''}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  <div style={{minWidth: "530px", textAlign:'left'}}>
                      <div>
                        Card Title: 
                            <input  style={{textAlign:'left'}} onChange={(e) => setEditCard({...editCard, card_title: e.target.value}) }/> 
                      </div>
    
                      <div style={{flex: 1,  border: '1px solid rgb(230, 230, 230)', minHeight: "300px"}}>
                      <div>
                        Card Body: 
                      </div>
                                <Editor

                                    //  Edit for CEO Message
                                    editorState={CardEditorState}
                                    onEditorStateChange={setCardEditorState}
                                    value={CardEditorState}
                                    onChange={(e) => setEditCard({...editCard, card_editor_contents : draftToHtml(convertToRaw(CardEditorState.getCurrentContent())).toString()})}

                                    />
                                </div>
                  </div>
                    
                  
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={() => handleSaveNewCard(editCard)} color="primary" autoFocus>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        );

} 



export default AddCard;