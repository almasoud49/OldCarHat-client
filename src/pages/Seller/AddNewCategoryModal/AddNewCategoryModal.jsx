
const AddNewCategoryModal = ({ handleAddNewCategory,categoryLoading }) => {
    return (
<>
			<input
				type='checkbox'
				id='add-new-category-modal'
				className='modal-toggle'
			/>
			<div className='modal'>
				<form
					onSubmit={handleAddNewCategory}
					className='modal-box relative text-center'
				>
					<label
						htmlFor='add-new-category-modal'
						className='btn btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					<h3 className='text-lg font-bold'>Add New Category</h3>
					<input
						required
						placeholder='category name'
						type='text'
						name='new_category'
						className='input input-bordered'
					/>
					<br />
					{categoryLoading && <p>Adding....</p>}
					{!categoryLoading && (
						<button className='btn mt-3'>Add</button>
					)}
				</form>
			</div>
		</>
    );
};

export default AddNewCategoryModal;