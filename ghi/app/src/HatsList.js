function HatsList(props) {
    return (
      <table className="table table-warning table-hover">
        <thead>
          <tr>
            <th>Fabric</th>
            <th>Style</th>
            <th>Color</th>
            <th>Image</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {props.hats.map(hat => {
            return (
              <tr key={hat.href}>
                <td>{ hat.fabric }</td>
                <td>{ hat.style }</td>
                <td>{ hat.color }</td>
                <td>{ hat.picture_url }</td>
                <td>{ hat.id }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default HatsList;
  