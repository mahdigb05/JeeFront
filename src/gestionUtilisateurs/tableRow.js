

const TableRow = ({utilisateur}) => {
    

    return(
        <>
			<Modal
					title={modalTitle}
					visible={visible}
					onOk={() => {handler()}}
					onCancel={() => {handleCancel()}}>
					<p>{modalText}</p>
					<i class="fas fa-chevron-down"></i>
			</Modal>
			<tr>
				<td><Button type="link" onClick = {() => {toggleExpand()}}><i class={(isExpanded) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i></Button></td>
				<td>{utilisateur.id}</td>
				<td>{utilisateur.nom}</td>
				<td>{utilisateur.prenom}</td>
				<td>{utilisateur.email}</td>
				<td className='overflow'>{courrier.objet}</td>
				<td>
					<Dropdown overlay={menu} placement="bottomLeft">
						<a><i class="fas fa-ellipsis-h"></i></a>
					</Dropdown>
				</td>
			</tr>

			<ExpandedTableRow  isExpanded={isExpanded} utilisateur={utilisateur} />

		</>
    )
}