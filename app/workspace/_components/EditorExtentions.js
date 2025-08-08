import { getGeminiResponse } from "@/config/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  Bold,
  Highlighter,
  Italic,
  Strikethrough,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkle,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EditorExtentions({ editor }) {

  const {fileId}= useParams();

  const SearchAi= useAction(api.myAction.search);
  const saveNotes=useMutation(api.notes.AddNotes);
  const {user} = useUser();

  const onAiClick=async()=>{

    toast("AI is Searching...");

    const selectedText= editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
    console.log("SelectedText:",selectedText);

    const result= await SearchAi({
      query:selectedText,
      fileId:fileId,
    })
    
    const UnformattedAns= JSON.parse(result);
    let AllUnformattedAns='';
    UnformattedAns&&UnformattedAns.forEach(items => {
      AllUnformattedAns = AllUnformattedAns+items.pageContent
    });

    const PROMPT="For quetion :"+selectedText+"And with the given content as answer,"+
    "please give apropriate Answer in HTML format. The Answer content is "+AllUnformattedAns;

     const AiModelResult = await getGeminiResponse(PROMPT);
      // console.log("Gemini Response:", AiModelResult);


      const FinalAns = AiModelResult.replace(/```/g, '').replace(/^html/, '').trim();


      const AllText=editor.getHTML();
      editor.commands.setContent(AllText+'<p> <Strong>Answer: </strong>'+FinalAns+'</p>')

      saveNotes({
        notes: editor.getHTML(),
        fileId:fileId,
        createdBy: user.primaryEmailAddress.emailAddress,
      })


  }
  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "text-blue-500" : "hover:text-blue-500"}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "text-blue-500" : "hover:text-blue-500"}
          >
            <Italic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor?.isActive("underline") ? "text-blue-500" : "hover:text-blue-500"}
          >
            <Underline />
          </button>
          {/* <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor?.isActive("highlight") ? "text-blue-500" : ""}
          >
            <Highlighter />
          </button> */}
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor?.isActive("strike") ? "text-blue-500" : "hover:text-blue-500"}
          >
            <Strikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor?.isActive({ textAlign: "left" }) ? "text-blue-500" : "hover:text-blue-500"
            }
          >
            <AlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor?.isActive({ textAlign: "center" }) ? "text-blue-500" : "hover:text-blue-500"
            }
          >
            <AlignCenter />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor?.isActive({ textAlign: "right" }) ? "text-blue-500" : "hover:text-blue-500" 
            }
          >
            <AlignRight />
          </button>
           <button
            onClick={() => onAiClick()}
            className={'hover:text-blue-500'}
          >
            <Sparkle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtentions;
