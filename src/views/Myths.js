import React, { useState, useEffect, useContext } from "react";
import { Icon, Accordion, Header, Loader } from "semantic-ui-react";
import { store } from "../store/contexts/store";

const Myths = () => {
  const { loadMyths, myths, mythsLoaded } = useContext(store);
  const [activeIndex, setActiveIndex] = useState(0);

  const onQuestionClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    loadMyths();
  }, []);

  return (
    <div>
      <Header as="h2" style={{ margin: "1rem 0 2rem 0" }}>
        Myths and Reality about corona virus
      </Header>
      {mythsLoaded ? (
        myths.length > 0 ? (
          <Accordion fluid styled style={{ marginTop: "1rem" }}>
            {myths.map((ques, i) => (
              <React.Fragment key={ques._id}>
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={onQuestionClick}
                >
                  <Icon name="dropdown" />
                  {ques.myth === ques.myth_np ? (
                    ques.myth
                  ) : (
                    <>
                      {ques.myth} <br />
                      <p style={{ marginLeft: "1.5rem" }}>{ques.myth_np}</p>
                    </>
                  )}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  {ques.reality === ques.reality_np ? (
                    <p>{ques.reality}</p>
                  ) : (
                    <>
                      <p>{ques.reality}</p>
                      <p>{ques.reality_np}</p>
                    </>
                  )}
                </Accordion.Content>
              </React.Fragment>
            ))}
          </Accordion>
        ) : (
          "No Myths"
        )
      ) : (
        <Loader active />
      )}
    </div>
  );
};

export default Myths;
