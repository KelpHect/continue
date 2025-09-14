import { Text } from "ink";
import React from "react";

interface UpdateNotificationProps {
  isRemoteMode?: boolean;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  isRemoteMode = false,
}) => {
  if (isRemoteMode) {
    return <Text color="cyan">◉ Remote Mode</Text>;
  }
  
  return (
    <Text wrap="truncate-end" color="gray">
      ● Continue CLI
    </Text>
  );
};

export { UpdateNotification };
