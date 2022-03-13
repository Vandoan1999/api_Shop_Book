import { IProvider, ProviderModel } from '@models/provider-model';
import { addProviderRequest } from '@requestModel/addProvierRequest';
import { updateProviderRequest } from '@requestModel/updateProviderRequest';
import { deleteProviderRequest } from '@requestModel/deleteProviderRequest';

/**`
 * Get all provider.
 * 
 * @returns 
 */
async function getAll(): Promise<IProvider[] | null> {
    return await ProviderModel.find({}).lean();
}

/**
 * Add one provider.
 * 
 * @param provider 
 * @returns 
 */
async function addOne(providerRequest: addProviderRequest) {
    const provider: addProviderRequest = {
        _id: providerRequest._id,
        name: providerRequest.name,
        address: providerRequest.address,
        phone: providerRequest.phone
    }
    let result = await new ProviderModel(provider).save();
    return result;
}



/**
 * Update one provider.
 * 
 * @param provider 
 * @returns providerUpdated
 */
async function updateOne(providerRequest: updateProviderRequest) {
    const provider: updateProviderRequest = {
        _id: providerRequest._id,
        name: providerRequest.name,
        address: providerRequest.address,
        phone: providerRequest.phone
    }
    let providerNeedUpdate = { ...provider };
    delete providerNeedUpdate._id;
    let providerBeforeUpdated = await ProviderModel.findByIdAndUpdate(provider._id, providerNeedUpdate).lean();
    if(!providerBeforeUpdated)
    {
        throw new Error("provider not exited");
        
    }
    return {
        providerBeforeUpdated,
        providerAfterUpdated: provider

    }
}
    /**
     * Delete a provider by their id.
     * 
     * @param id 
     * @returns 
     */

    async function deleteOne(request: deleteProviderRequest) {
            if (request.id) {
                let result = await ProviderModel.findByIdAndDelete(request.id).lean();
                if (!result) {
                    throw new Error("_id not exits!");
                }
                return result;
            }
            throw new Error("Cannot find id provider!");
    }


    // Export default
    export default {
        getAll,
        addOne,
        updateOne,
        deleteOne
    } as const;
