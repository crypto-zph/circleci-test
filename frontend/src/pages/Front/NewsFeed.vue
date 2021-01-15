<template>
	<div class="font-rubik-labels">
		<div class="news__feed">
			<div class="row">
				<div class="col-7">
					<q-scroll-area 
					style="height: 78.9vh; width: 100%;"
					:thumb-style="thumbStyle"
					:bar-style="barStyle"
					class="q-pr-md">
					<div v-for="a in 10" key="a" class="q-pt-md">
						<q-item>
							<q-item-section avatar>
								<q-avatar>
									<img style="border: 2px solid #9A67AC" src="https://i.imgur.com/ITUDbw3.png">
								</q-avatar>
							</q-item-section>

							<q-item-section>
								<q-item-label><b>Toqaf Malupit</b></q-item-label>
								<q-item-label caption>1 Hour ago</q-item-label>
							</q-item-section>

							<div align="right">
								<q-btn size="10px" icon="fas fa-ellipsis-h" round flat />
							</div>
						</q-item>

						<img @click="view.posted = true" style="border-radius: 10px; width: 100%; cursor: pointer" src="https://res.cloudinary.com/teepublic/image/private/s--gw3ZWPRH--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_465/c_crop,g_north_west,h_620,w_465,x_0,y_-91/g_north_west,u_upload:v1446840660:production:blanks:nnww1jebayb5zbwztdgd,x_-391,y_-367/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1575398740/production/designs/7016594_0.jpg">
						<q-btn flat round class="q-mx-xs">
							<q-icon name="far fa-thumbs-up" size="20px"/>
						</q-btn>
						<q-btn flat round class="q-mx-xs">
							<q-icon name="far fa-comment-alt" size="20px"/>
						</q-btn>
						<q-btn flat round class="q-mx-xs">
							<q-icon name="far fa-paper-plane" size="20px"/>
						</q-btn>
						<q-card-section>
							<div><b>400 Likes</b></div>
							<div><b>Toqaf Malupit </b>IU Blue hoodie sale now on 12.12 | Lee ji eun hoodie small medium large | Blueming 블루밍</div>
							<div @click="view.posted = true" style="cursor: pointer" class="text-grey-7 q-mt-sm">View All 10 comments</div>
							<div><b>Gelo Pogi </b>Nc pre bibili ako nyan kapag may pera nako sa 2050</div>
							<div><b>Paul pogier </b>Penge naman ako pambili gelo paunahan nalang sa benta ni toqah</div>
							<div>
								<q-input borderless class="q-px-md" style="background: #d1d1d1; border-radius: 10px" placeholder="Add a comment..." >
									<template v-slot:append>
										<q-btn label="Post" flat color="secondary" no-caps />
									</template>
								</q-input>
							</div>
						</q-card-section>

						<q-separator class="q-mb-sm" />
					</div>
				</q-scroll-area>
			</div>
			<div class="col-5">
				<div class="q-py-md q-px-lg">
					<q-btn @click="create.post = true" label="create post" style="height: 50px" class="full-width bg-secondary text-white text-bold" rounded flat />
				</div>
				<div class="q-px-sm">
					<q-item>
						<q-item-section avatar>
							<q-avatar size="50px" style="cursor: pointer">
								<img style="border: 2px solid #9A67AC" src="https://i.imgur.com/ITUDbw3.png">
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label style="cursor: pointer"><b>Toqaf Malupit</b></q-item-label>
							<q-item-label caption>@toqafLangMalakas123123</q-item-label>
						</q-item-section>

						<div align="right">
							<q-btn size="10px" icon="fas fa-ellipsis-h" round flat />
						</div>
					</q-item>

				</div>
				<div class="q-px-lg q-pt-md">
					<div class="text-grey-7 text-bold" style="font-size: 20px">
						Suggestion for you
					</div>
				</div>
				<div class="q-px-sm q-py-sm">
					<q-item>
						<q-item-section avatar>
							<q-avatar style="cursor: pointer">
								<img style="border: 2px solid #9A67AC" src="https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/b5b75a61-c023-43a1-9a12-924773a3d51a_72695011_515793855687177_6497185184176620114_n.jpg">
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label style="cursor: pointer"><b>Gelo Pogi</b></q-item-label>
							<q-item-label caption>@AngPogiPogiKo121</q-item-label>
						</q-item-section>

						<div align="right">
							<q-btn label="Follow" color="secondary" rounded outline />
						</div>
					</q-item>
				</div>
				<div class="q-px-md q-py-sm">
					<q-separator  />
				</div>
				<div class="q-px-lg q-py-xl q-mx-md text-center self-center" style="border: 2px solid #e0e0e0; border-radius: 10px; cursor: pointer">
					<div class="text-bold text-grey-8" style="font-size: 22px">
						ADS HERE
					</div>
				</div>
			</div>
		</div>
	</div>


	<q-dialog v-model="view.posted" full-width full-height>
		<div class="bg-white" style="width: 500px">
			<div class="row">
				<div class="col-8">
					<q-scroll-area 
					style="height: 92.5vh; width: 100%;"
					:thumb-style="thumbStyle"
					:bar-style="barStyle">
					<img style="width: 100%; cursor: pointer" src="https://res.cloudinary.com/teepublic/image/private/s--gw3ZWPRH--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_465/c_crop,g_north_west,h_620,w_465,x_0,y_-91/g_north_west,u_upload:v1446840660:production:blanks:nnww1jebayb5zbwztdgd,x_-391,y_-367/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1575398740/production/designs/7016594_0.jpg">
				</q-scroll-area>
			</div>
			<div class="col-4 q-pa-md">
				<q-scroll-area 
				style="height: 71vh; width: 100%;"
				:thumb-style="thumbStyle"
				:bar-style="barStyle">
				<div>
					<q-item>
						<q-item-section avatar>
							<q-avatar size="50px" style="cursor: pointer">
								<img style="border: 2px solid #9A67AC" src="https://i.imgur.com/ITUDbw3.png">
							</q-avatar>
						</q-item-section>

						<q-item-section>
							<q-item-label style="cursor: pointer"><b>Toqaf Malupit</b></q-item-label>
							<q-item-label caption>@toqafLangMalakas123123</q-item-label>
						</q-item-section>

						<div align="right">
							<q-btn size="10px" icon="fas fa-ellipsis-h" round flat />
						</div>
					</q-item>
				</div>
				<div class="q-my-sm q-mx-md">
					Mga fre bili na kayo sale yan pre for 200BRT Meet up Moa, Cubao, Megamall rush bilin niyo na need ko money para sa kakainin namin sa gitna ng pandemya
				</div>
				<div class="q-mt-lg q-mt-md q-mx-md text-grey-6">
					6:36 PM NOV 17 , 2020
				</div>
				<div class="q-mx-lg q-my-md">
					<q-separator />
				</div>
				<div class="row">
					<div class="col-4 text-center" style="cursor: pointer">
						<b>400</b> Likes
					</div>
					<div class="col-4 text-center" style="cursor: pointer">
						<b>100</b> Comments
					</div>
					<div class="col-4 text-center" style="cursor: pointer">
						<b>50</b> Shares
					</div>
				</div>
				<div class="q-mx-lg q-my-md">
					<q-separator />
				</div>
				<div>
					<div v-for="t in 10" key="t">
						<q-item>
							<q-item-section avatar>
								<q-avatar style="cursor: pointer">
									<img style="border: 2px solid #9A67AC" src="https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/b5b75a61-c023-43a1-9a12-924773a3d51a_72695011_515793855687177_6497185184176620114_n.jpg">
								</q-avatar>
							</q-item-section>

							<q-item-section>
								<q-item-label style="cursor: pointer"><b>Gelo Pogi</b> Nc pre bibili ako nyan kapag may pera nako sa 2050</q-item-label>
							</q-item-section>
						</q-item>

						<div class="q-mx-lg">
							<q-separator />
						</div>
					</div>

				</div>
			</q-scroll-area>
			<div class="q-mt-xs">
				<q-btn flat round class="q-mx-xs">
					<q-icon name="far fa-thumbs-up" size="20px"/>
				</q-btn>
				<q-btn flat round class="q-mx-xs">
					<q-icon name="far fa-comment-alt" size="20px"/>
				</q-btn>
				<q-btn flat round class="q-mx-xs">
					<q-icon name="far fa-paper-plane" size="20px"/>
				</q-btn>
				<q-input borderless class="q-px-md" style="background: #d1d1d1; border-radius: 10px" placeholder="Add a comment..." >
					<template v-slot:append>
						<q-btn label="Post" flat color="secondary" no-caps />
					</template>
				</q-input>
			</div>
		</div>
	</div>
</div>
</q-dialog>


<q-dialog v-model="create.post">
	<div class="bg-white text-black" style="width: 700px; max-width: 80vw; border-radius: 10px">
		<div class="full-width text-center q-py-md text-bold row" style="font-size: 22px">
			<div class="col-11 self-center">
				Create Post
			</div>
			<div class="col-1">
				<q-btn flat round icon="close" class="bg-grey-3" v-close-popup />
			</div>
		</div>
		<div class="q-mx-md">
			<q-separator /> 
		</div>
		<div> 
			<q-item>
				<q-item-section avatar>
					<q-avatar style="cursor: pointer">
						<img style="border: 2px solid #9A67AC" src="https://assets-metrostyle.abs-cbn.com/prod/metrostyle/attachments/b5b75a61-c023-43a1-9a12-924773a3d51a_72695011_515793855687177_6497185184176620114_n.jpg">
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label style="cursor: pointer"><b>Gelo Pogi</b></q-item-label>
					<q-item-label caption>@AngPogiPogiKo121</q-item-label>
				</q-item-section>
			</q-item>
		</div>
		<div class="q-mx-md">
			<q-input
			v-model="text"
			borderless
			placeholder="Upload something, Toqaf Malupit"
			style="font-size: 22px;"
			type="textarea"
			/>
		</div>
		<div class="q-ma-md q-px-md q-py-sm text-bold row" style="border: 1px solid #c7c7c7; border-radius: 10px">
			<div class="col-6 self-center">
				Add Attachment
			</div>
			<div class="col-6 text-right">
				<q-btn icon="far fa-file-image" color="green" round flat />
				<q-btn icon="far fa-file-video" color="secondary" round flat />
				<q-btn icon="fas fa-camera" color="blue" round flat />
				<q-btn icon="fas fa-laugh-beam" color="orange" round flat />
				<q-btn icon="fas fa-map-marker-alt"color="red" round flat />
			</div>
		</div>
	</div>
</q-dialog>
</div>
</template>



<script>
	export default {
		data() {
			return {
				    thumbStyle: {
					right: '4px',
					borderRadius: '5px',
					backgroundColor: '#c7c7c7',
					width: '5px',
					opacity: 0.75
				},

				barStyle: {
					right: '2px',
					borderRadius: '9px',
					backgroundColor: '#c7c7c7',
					width: '9px',
					opacity: 0.2
				},
				create: {
					post: false
				},
				view: {
					posted: false
				},
			}
		}
	}
</script>


<style>
	.news__feed {
		padding: 0px 300px;
	}
	@media (max-width: 1350px) {
		.news__feed {
			padding: 0px 200px;
		}
	}
	@media (max-width: 1174px) {
		.news__feed {
			padding: 0px 100px;
		}
	}
</style>