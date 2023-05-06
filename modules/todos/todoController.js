import { todoModel } from "../../DB/models/todoModel.js";
import { tokenFunction } from "../../utils/tokenFunction.js";
//----------------------------------getAllTodo--------------------

export const getAllTodo = async (req, res) =>
{
    try
    {
        const { _id } = req.user;

        const todos = await todoModel.find({ addedBy: _id });

       return res.json({ message: 'Todos retrieved successfully', todos });
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error retrieving todos', error: error.message });
    }
};


//---------------------------------------addTodo------------------------------


export const addTodo = async (req, res) =>
{
    try
    {
        const { title, description , addedBy} = req.body;
        const { _id } = req.user
        

        if (_id == addedBy)
        {
            const newTodo = new todoModel({
                title, description,
                addedBy: req.user._id,
            });
            const savedTodo = await newTodo.save();
            savedTodo
                ? res.json({ message: 'New Todo Added Success', savedTodo })
                : res.json({ message: 'Can Not add New Todo' })
        } else
        {
            return res.json({ message: 'You Are Not Authorized To add ' })
        }
        
       
        
    }
    catch (error)
    {
        return res.status(500).json({message:'Catch error' , error : error.message})
    }
}

//---------------------------------Status Complete---------------------------------------------–---------

export const statusone = async (req, res) =>
{
    try
    {
        const { todoId } = req.body;
        const { _id } = req.user;

        const update = await todoModel.updateOne(
            { _id: todoId, status: { $ne: 'completed' } },
            { $set: { status: 'completed' } }
        );

        if (update.modifiedCount > 0)
        {
           return  res.json({ message: 'Task is now completed', update });
        } else
        {
         return    res.json({ message: 'Task cannot be completed' });
        }
    } catch (error)
    {
        return res.status(500).json({ message: 'Error updating task', error: error.message });
        
    }
};
//------------------------------------StatusAll Completed-----------------------------------

export const statusAll = async (req, res) =>
{
    try
    {
        const { _id } = req.user;

        const update = await todoModel.updateMany( 
            { status: 'pending' },
            { $set: { status: 'completed' } }
        );

        if (update.modifiedCount > 0)
        {
          return  res.json({ message: 'All pending tasks are now completed', update });
        }
        else
        {
             return res.json({ message: 'No pending tasks to complete' });
        }
    } catch (error)
    {
        res.status(500).json({ message: 'Error completing tasks', error: error.message });
        console.log(error);
    }
};

//-------------------------------updateOne-------------------------------------------

export const updateOne = async (req, res) =>
{
    try
    {   
        const { todoId } = req.params;
        const { title, description , addedBy } = req.body;
        const { _id } = req.user
        
        if (_id == addedBy)
        {
            const checktodo = await todoModel.findById(todoId);

            if (checktodo)
            {
                const update = await todoModel.findByIdAndUpdate(todoId,
                    {
                    title, description
                    },
                    { new: true })
                
                update 
                    ? res.json({ message: 'Todo Updated Done', update })
                    : res.json({ message: 'Todo Updated Done' })
            }
            else
            {
                return res.json({ message: 'NO SUCH USER WITH THIS ID' });
            }
            
        } else
        {
            return res.json({ message: 'You are not authorized to update this . ' });
        } 
    }
    catch (error)
    {
        res.status(500).json({ message: 'Error completing tasks', error: error.message });
    }
};

//-------------------------------------updateMany----------------------------------


export const updateMany = async (req, res) =>
{
    try
    {
        const { title, description , addedBy } = req.body;
        const { _id } = req.user; 

        if (_id == addedBy)
        {
            const update = await todoModel.updateMany(
                { addedBy: req.user._id },
                { $set: { title , description } }
            )
            
            update.modifiedCount>0 
                ? res.json({message : 'Updated Done' , update})
                : res.json({message : 'Can Not update , Sorry .. '})
        }
        else
        {
            return res.json({message:'You are not authorized to Update'})
        }

        
    }
    catch (error)
    {
        res.status(500).json({ message: 'Catch Error Updating All', error: error.message });

    }
};

//------------------------------------deleteOne------------------------------

export const deleteOne = async(req, res) =>
{
    try
    {
        // const { addedBy } = req.user
        const { todoId } = req.params;
        const { _id } = req.user
        
        // console.log(_id);
            const checktodo = await todoModel.findById(todoId)

            if (checktodo)
            {
                const deleted = await todoModel.findOneAndDelete({ _id:todoId, addedBy:_id})
                
                

                if (deleted)
                {
                    
                    res.json({ message: 'Todo Deleted Done', deleted })
                } else
                {
                    res.json({ message: 'YOU ARE NOT AUTHORIZED TO DELETE THIS . Go OFF MY WEPSITE' })
                }
                    
                    
            } else
            {
                res.json({ message: 'No such Todo Found , TRY AGAIN' })
            }  
    }
    catch (error)
    {   
        console.log(error);
        res.status(500).json({ message: 'Catch Error Deleting One', error: error.message });
        
    }
};
//---------------------------------deleteMany---------------------------------------------------

export const deleteMany = async (req, res) =>
{
    try
    {
        const { _id } = req.user;

        const deleted = await todoModel.deleteMany({ addedBy: _id });

        if (deleted.deletedCount > 0)
        {
           return res.json({ message: 'All Deleted Successfully', deleted });
        } else
        {
          return   res.json({ message: 'No Todo Items Found to Delete' });
        }
    } catch (error)
    {
        res.status(500).json({ message: 'Error deleting Todo ', error: error.message });
    }
};
//--------------------------------Search------------------------------------------


export const Search = async (req, res) =>
{
    try
    {
        const { _id } = req.user;
        const { title } = req.query;

        const check = await todoModel.findOne({ title, addedBy: _id });

        if (check)
        {
          return  res.json({ message: 'Todo Found:', todo: check });
        } else
        {
           return  res.status(404).json({ message: 'Todo Not Found' });
        }
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Error searching for Todo', error: error.message });
    }
};
