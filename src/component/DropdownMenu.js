const DropdownMenu = (props) => {
    return (
        <div className="dropdown dropdown-bottom mx-3">
            <label tabIndex={0} className="btn btn-xs">
                Sort
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <a onClick={() => props.sortingFunction(true)}>Sort asc</a>
                </li>
                <li>
                    <a onClick={() => props.sortingFunction(false)}>
                        Sort desc
                    </a>
                </li>
            </ul>
        </div>
    );
};

export { DropdownMenu };