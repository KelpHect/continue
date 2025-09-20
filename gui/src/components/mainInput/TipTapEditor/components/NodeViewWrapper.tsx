import {
  NodeViewWrapper as TiptapNodeViewWrapper,
  NodeViewWrapperProps as TiptapNodeViewWrapperProps,
} from "@tiptap/react";
import React from "react";

interface NodeViewWrapperProps {
  children: React.ReactNode;
}

export const NodeViewWrapper: React.FC<NodeViewWrapperProps> = ({
  children,
}) => {
  // Using "div" instead of "p" to avoid nesting block elements inside paragraph
  // This fixes HTML validation warnings about <pre> inside <p>
  // See https://github.com/continuedev/continue/issues/3199 for original context
  const nodeViewWrapperTag: TiptapNodeViewWrapperProps["as"] = "div";

  return (
    <TiptapNodeViewWrapper className="my-1.5" as={nodeViewWrapperTag}>
      {children}
    </TiptapNodeViewWrapper>
  );
};
