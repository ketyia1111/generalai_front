import React from 'react';

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '9rvq5ej22g0p6nl.png'
    };
  }

  componentDidMount() {
    // Azure Blob StorageのURLを設定します。
    // このURLは、Azureポータルから取得できます。
    const url = 'https://projectkeita.blob.core.windows.net/images/';

    this.setState({
      imageUrl: url
    });
  }

  render() {
    return (
      <div>
        <img src={this.state.imageUrl} alt="From Azure Blob Storage" />
      </div>
    );
  }
}

export default ImageComponent;
