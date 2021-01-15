export function updateUser (state, user_info)
{
    if(user_info)
    {
        state.user_info = user_info;
    }
    else
    {
        state.user_info = null;
    }
}

export function changeRatePopup (state, bool)
{
    state.is_rate_open = bool;
}
