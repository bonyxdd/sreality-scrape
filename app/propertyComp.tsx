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
  return (
    <div className="property-wrap">
      {componentData.map((data, index) => (
        <SingleProperty key={index} propTitle={data.propTitle} propUrl={data.propUrl} />
      ))}
    </div>
  );
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