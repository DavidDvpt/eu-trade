const titles: TitleDisplay[] = [
    { label: 'Name', display: 'name' },
    { label: 'is actif', display: 'isActif' },
];

function CategoriesManage() {
    return (
        <div>
            <h1>Categories Manager</h1>

            {/* <ManageTable
                titles={titles}
                rows={data ?? []}
                addButton={<FamilyRowProvider />}
            >
                <FamilyRowProvider />
            </ManageTable> */}
        </div>
    );
}

export default CategoriesManage;
