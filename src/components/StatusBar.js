export const StatusBar = ({ message }) => {
    return (
      <div className="text-white p-4 flex justify-between text-xs">
        <div>10:10 AM</div>
        <div>{message}</div>
      </div>
    );
  };
  