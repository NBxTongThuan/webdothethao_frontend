export function setQuantity(quantity:number, maxQuantity:number) : number
{
        if(quantity <= maxQuantity)
        {
            return quantity;
        }
        else
        return maxQuantity;
}