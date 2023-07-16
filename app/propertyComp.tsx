import { QueryResult } from 'pg';
import React from 'react';

type Property = {
  propTitle: string;
  propUrl: string;
};

const SingleProperty: React.FC<Property> = ({ propTitle, propUrl }) => {
  return (
    <div className="property">
      <img src={propUrl} alt="" />
      <div className="title">{propTitle}</div>
    </div>
  );
};

type MyComponentArrayProps = {
  componentData: Property[];
};

const MyComponentArray: React.FC<MyComponentArrayProps> = ({ componentData }) => {
  const chunkSize = 50;
  const chunks = Math.ceil(componentData.length / chunkSize);
  const renderedChunks = [];

  for (let i = 0; i < chunks; i++) {
    const startIndex = i * chunkSize;
    const endIndex = (i + 1) * chunkSize;
    const chunkData = componentData.slice(startIndex, endIndex);

    const renderedChunk = (
      <div className={`property-wrap property-wrap${i + 1}`} key={i}>
        {chunkData.map((data, index) => (
          <SingleProperty key={index} propTitle={data.propTitle} propUrl={data.propUrl} />
        ))}
      </div>
    );

    renderedChunks.push(renderedChunk);
  }

  return <div>{renderedChunks}</div>;
};

type AppProps = {
  titles: string[];
  urls: string[];
};

const App: React.FC<AppProps> = ({ titles, urls }) => {
  const componentData: Property[] = titles.map((title, index) => ({
    propTitle: title,
    propUrl: urls[index],
  }));
  
    return (
        <MyComponentArray componentData={componentData} />
    );
};

export default App;