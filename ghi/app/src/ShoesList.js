function ShoesList(props) {
    return (
      <table className="table table-warning table-hover">
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {props.shoes.map(shoe => {
            return (
              <tr key={shoe.href}>
                <td>{ shoe.model }</td>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.color }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
  export default ShoesList;
  