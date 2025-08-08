"use node"; 

import { action } from "./_generated/server";
import { v } from "convex/values";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

// ✅ Move ConvexVectorStore import *inside* the handlers
// so it loads only in Node runtime and not during browser bundling

export const ingest = action({
  args: {
    splitText: v.array(v.string()),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const { ConvexVectorStore } = await import("@langchain/community/vectorstores/convex");

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY, // 
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
    });

    const metadataList = args.splitText.map(() => ({
      fileId: args.fileId
    }));

    await ConvexVectorStore.fromTexts(
      args.splitText,
      metadataList,
      embeddings,
      { ctx }
    );

    return "completed....";
  }
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const { ConvexVectorStore } = await import("@langchain/community/vectorstores/convex");

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter(q => q.metadata.fileId === args.fileId);

    console.log(resultOne, "fileId:", args.fileId);
    return JSON.stringify(resultOne);
  }
});
