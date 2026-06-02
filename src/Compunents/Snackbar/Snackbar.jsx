function Snackbar({ text = "Snackbar", show = false }) {
  // if (!show) return null;
  return (
    <div
      className={`
  bg-(--bg-snackbar) max-w-100 w-[80%] rounded-md h-10  
  flex items-center justify-center
  fixed left-1/2 -translate-x-1/2 -bottom-20
  transition-all duration-300 ease-out

  ${show
    ? "bottom-6"
    : "-bottom-20  pointer-events-none"}
`}
    >
      {text}
      <div className="h-10 absolute right-2 text-2xl cursor-pointer px-2 ">
        ×
      </div>
    </div>
  );
}

export default Snackbar;
