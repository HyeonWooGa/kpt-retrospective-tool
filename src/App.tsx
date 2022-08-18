import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board, { Area } from "./Components/Board";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  margin-top: 10px;
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  height: 100vh;
  width: 100%;
`;

const I = styled.i`
  font-size: 50px;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 40px;
`;

const Boards1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 95vh;
  gap: 10px;
`;

const Boards2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45vw;
  height: 95vh;
  gap: 10px;
`;

const Footer = styled.footer`
  position: absolute;
  font-weight: 400;
  bottom: 0;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;

    if (destination.droppableId === "Delete") {
      // cross board movement.
      setToDos((allBoards) => {
        // 1) Delete item on source board
        const sourceBoard = [...allBoards[source.droppableId]];
        sourceBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
        };
      });
    } else {
      if (destination.droppableId === source.droppableId) {
        // same board movement.
        setToDos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          // 1) Deldte item on source.index
          const targetToDo = boardCopy.splice(source.index, 1);
          // 2) Put back the item on the destination.index
          boardCopy.splice(destination?.index, 0, ...targetToDo);
          return {
            ...allBoards,
            [source.droppableId]: boardCopy,
          };
        });
      }
      if (destination.droppableId !== source.droppableId) {
        // cross board movement.
        setToDos((allBoards) => {
          // 1) Delete item on source board
          const sourceBoard = [...allBoards[source.droppableId]];
          const targetToDo = sourceBoard.splice(source.index, 1);
          // 2) put back the item on the destination board
          const destinationBoard = [...allBoards[destination.droppableId]];
          destinationBoard.splice(destination.index, 0, ...targetToDo);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard,
            [destination.droppableId]: destinationBoard,
          };
        });
      }
    }
    /*setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // 1) Deldte item on source.index
      toDosCopy.splice(source.index, 1);
      // 2) Put back the item on the destination.index
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy;
    });*/
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Container1>
            <Boards1>
              <Board boardId={"Keep"} key={"Keep"} toDos={toDos.Keep} />
              <Board
                boardId={"Problem"}
                key={"Problem"}
                toDos={toDos.Problem}
              />
            </Boards1>
            <Boards2>
              <Board boardId={"Try"} key={"Try"} toDos={toDos.Try} />
              <Droppable droppableId="Delete">
                {(magic, info) => (
                  <Area
                    isDraggingOver={info.isDraggingOver}
                    isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                  >
                    <I className="fa-solid fa-trash-can"></I>
                    {magic.placeholder}
                  </Area>
                )}
              </Droppable>
            </Boards2>
          </Container1>
          <Footer>&copy; 2022 코드스테이츠 SEB FE 40기 박연우</Footer>
        </Wrapper>
      </DragDropContext>
    </Container>
  );
}

export default App;
