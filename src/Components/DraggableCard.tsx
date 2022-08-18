import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 5px;
  font-weight: 400;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DrragableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  //console.log(toDoText, "has been rendered");
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, info) => (
        <Card
          isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DrragableCard);
