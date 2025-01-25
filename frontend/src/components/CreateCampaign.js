import React, { useState } from "react";
import { getContract } from "./ContractUtils"
import { ethers } from "ethers";

const CreateCampaign = () => {

    const [formData, SetFormData] = useState({
        title: '',
        description: '',
        targetAmount: '',
        deadline: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        SetFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { contract, } = await getContract();
            const tx = await contract.createCampaign(
                formData.title,
                formData.description,
                ethers.parseUnits(formData.targetAmount),
                Math.floor(new Date(formData.deadline).getTime() / 1000));
            await tx.wait();
            alert('Campaign created successfully');
        }
        catch (err) {
            alert('Failed to create campaign');
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title: </label>
                <input type='text' name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label>Description: </label>
                <textarea type='text' name="description" value={formData.description} onChange={handleChange} required ></textarea>
            </div>
            <div>
                <label>Amount: </label>
                <input type='text' name="targetAmount" value={formData.targetAmount} onChange={handleChange} required />
            </div>
            <div>
                <label>Deadline(Date):  </label>
                <input type='datetime-local' name="deadline" value={formData.deadline} onChange={handleChange} required />
            </div>
            <button type="submit">Create Campaign</button>

        </form>
    );
};
export default CreateCampaign;








