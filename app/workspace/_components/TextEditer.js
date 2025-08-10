import { Placeholder } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import EditorExtentions from './EditorExtentions'
import TextAlign from '@tiptap/extension-text-align';
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

function TextEditer({fileId}) {

   const notes= useQuery(api.notes.GetNotes,{
    fileId:fileId,
   })

   console.log(notes);

     const editor = useEditor({
    extensions: [StarterKit,
      Placeholder.configure({
        placeholder: 'For taking notes, select the question and press the sparkle icon '
      }),
       TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    ],
    editorProps:{
        attributes:{
          class:'focus outline-none h-screen p-5'
        }
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  useEffect(()=>{
    editor&&editor.commands.setContent(notes)
  },[notes&&editor])
  return (
    <div>

        <div>
          <EditorExtentions editor={editor} />
        </div>
        <div className='overflow-scroll h-[88vh]'>
            <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TextEditer
